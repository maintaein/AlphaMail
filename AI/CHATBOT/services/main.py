from flask import Flask, request, jsonify
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

app = Flask(__name__)

embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

chroma_client = chromadb.PersistentClient(path="../db")
collection = chroma_client.get_or_create_collection(
    name="saved_schedules",
    embedding_function=embedding_function
)

@app.route("/api/vector/upsert", methods=["POST"])
def upsert_schedule():
    data = request.get_json()

    schedule_id = str(data["schedule_id"])
    user_id = str(data["user_id"])
    text = data["text"]

    collection.upsert(
        ids=[schedule_id],
        documents=[text],
        metadatas=[{"user_id": user_id}]
    )

    return jsonify({"status": "upsert success"})

@app.route("/api/vector/search", methods=["POST"])
def search_schedule():
    data = request.get_json()
    query = data["query"]
    user_id = str(data["user_id"])

    results = collection.query(
        query_texts=[query],
        n_results=5,
        where={"user_id": user_id}
    )

    return jsonify(results["documents"][0])  # 유사 일정 top 5만 응답

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
