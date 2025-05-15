from flask import Flask, request, jsonify
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

app = Flask(__name__)

embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

chroma_client = chromadb.PersistentClient(path="../db")
collection = chroma_client.get_or_create_collection(
    name="alpha_documents",
    embedding_function=embedding_function
)

@app.route("/api/vector/upsert", methods=["POST"])
def upsert_document():
    data = request.get_json()

    vector_id = str(data["id"])
    text = data["text"]
    metadata = data["metadata"]

    collection.upsert(
        ids=[vector_id],
        documents=[text],
        metadatas=[metadata]
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
        n_results=10,
        where=where
    )

    ids = results["ids"][0]
    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    matched = []
    for i in range(len(ids)):
        matched.append({
            "id": metadatas[i].get("domain_id"),
            "text": documents[i]
        })

    return jsonify(matched)  # 유사 일정 top 10만 응답

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
