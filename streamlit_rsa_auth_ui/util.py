import rsa
import os

def _saveToFile(bytes: bytes, filePath: str):
    with open(filePath, "wb") as f:
        f.write(bytes)


def generateKeyPair(folderPath: str, keyName: str):
    (publicKey, privateKey) = rsa.newkeys(2048)
    
    bytes = publicKey.save_pkcs1()
    filePath = os.path.join(folderPath, f"{keyName}.pub")
    _saveToFile(bytes, filePath)
    
    bytes = privateKey.save_pkcs1()
    filePath = os.path.join(folderPath, f"{keyName}")
    _saveToFile(bytes, filePath)