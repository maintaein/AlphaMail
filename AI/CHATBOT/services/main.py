from flask import Flask, request, jsonify
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from collections import defaultdict

app = Flask(__name__)

embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

chroma_client = chromadb.PersistentClient(path="../db")
collection = chroma_client.get_or_create_collection(
    name="alpha_documents",
    embedding_function=embedding_function
)

def chunk_by_lines(text: str, lines_per_chunk: int = 2, overlap: int = 1) -> list[str]:
    lines = [line.strip() for line in text.strip().split('\n') if line.strip()]
    chunks = []
    i = 0
    while i < len(lines):
        chunk_lines = lines[i:i + lines_per_chunk]
        chunks.append("\n".join(chunk_lines))
        i += lines_per_chunk - overlap
    return chunks

@app.route("/api/vector/upsert", methods=["POST"])
def upsert_document():
    data = request.get_json()

    vector_id = str(data["id"])
    text = data["text"]
    metadata = data["metadata"]

    chunks = chunk_by_lines(text, lines_per_chunk=2, overlap=0)
    ids = [f"{vector_id}_{i}" for i in range(len(chunks))]
    metadatas = [metadata | {"chunk_index": i} for i in range(len(chunks))]

    collection.upsert(
        ids=ids,
        documents=chunks,
        metadatas=metadatas
    )

    return jsonify({"status": "upsert success"})

@app.route("/api/vector/search", methods=["POST"])
def search_schedule():
    data = request.get_json()
    query = data["query"]
    where_dic = data.get("where", {})

    if len(where_dic) > 1:
        where = {"$and": [{k: v} for k, v in where_dic.items()]}
    else:
        where = where_dic

    results = collection.query(
        query_texts=[query],
        n_results=50,
        where=where
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    grouped = defaultdict(list)

    for doc, meta in zip(documents, metadatas):
        grouped[meta["domain_id"]].append((meta.get("chunk_index", 0), doc))

    merged = []
    for domain_id, chunks in grouped.items():
        chunks.sort(key=lambda x: x[0])
        full_text = "\n".join(doc for _, doc in chunks)
        merged.append({"id": domain_id, "text": full_text})

    return jsonify(merged[:10])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
