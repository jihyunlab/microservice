from fastapi import FastAPI
from fastapi_mqtt import FastMQTT, MQTTConfig
from concurrent import futures
import grpc
import grpc_pb2
import grpc_pb2_grpc
import ast
import json
import time

app = FastAPI()

# HTTP
@app.get("/microservice/http")
async def http():
  print("http()")
  time.sleep(3)
  print("http(): return")
  return { "code": 0, "message": "http()" }

# MQTT
mqtt = FastMQTT(
  config=MQTTConfig(host="127.0.0.1", port=1883, keepalive=60)
)

mqtt.init_app(app)

@mqtt.subscribe("/microservice/mqtt")
async def mqtt_subscribe(client, topic, payload, qos, properties):
  print("mqtt()")
  time.sleep(3)
  request = ast.literal_eval(payload.decode('utf-8'))
  response = { "response": {"code": 0, "message": "mqtt()"}, "isDisposed": True, "id": request['id'] }
  print("mqtt():", json.dumps(response))
  mqtt.publish("/microservice/mqtt/reply", json.dumps(response))
  print("mqtt(): return")

# GRPC
# py -m grpc_tools.protoc -I=protos/ --python_out=. --grpc_python_out=. protos/grpc.proto
class Grpc(grpc_pb2_grpc.GrpcServiceServicer):
  def grpc(self, req, context):
    print("grpc()")
    time.sleep(3)
    print("grpc(): return")
    return grpc_pb2.GrpcResponse(code=0, message="grpc()")

def initGrpc():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  grpc_pb2_grpc.add_GrpcServiceServicer_to_server(Grpc(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  initGrpc()

  

