# llm_server.py
import subprocess
import time

if __name__ == "__main__":
    model = "mistralai/Mathstral-7B-v0.1"
    host = "0.0.0.0"
    port = 8000
    tensor_parallel_size = 1

    cmd = [
        "python", "-m", "vllm.entrypoints.openai.api_server",
        "--model", model,
        "--host", host,
        "--port", str(port),
        "--tensor-parallel-size", str(tensor_parallel_size)
    ]
    print("백그라운드로 vllm 서버를 실행합니다:", " ".join(cmd))
    process = subprocess.Popen(cmd)
    print(f"서버 PID: {process.pid}")
    print("서버가 백그라운드에서 실행 중입니다. 중지하려면 kill 명령을 사용하세요.")
    try:
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        print("서버를 종료합니다.")
        process.terminate()