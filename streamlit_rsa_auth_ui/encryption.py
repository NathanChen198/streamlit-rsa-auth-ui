# Author    : Nathan Chen
# Date      : 11-Mar-2024


import rsa
import os
import base64
import json
from typing import Dict, Any


class Encryptor:
    privateKey: rsa.PrivateKey
    publicKeyPem: str

    @classmethod
    def generateNew(cls, nbits: int):
        (publicKey, privateKey) = rsa.newkeys(nbits)
        encryptor = cls()
        encryptor.privateKey = privateKey
        encryptor.publicKeyPem = publicKey.save_pkcs1().decode()
        return encryptor

    @classmethod
    def getKeyPath(cls, path: str, name: str):
        publicKeyPath = os.path.join(path, f'{name}.pub')
        privateKeyPath = os.path.join(path, name)
        return (publicKeyPath, privateKeyPath)        
    
    @classmethod
    def load(cls, path: str, name: str):
        (publicKeyPath, privateKeyPath) = cls.getKeyPath(path, name)
        encryptor = cls()
        
        with open(publicKeyPath, 'r') as f:
            encryptor.publicKeyPem = f.read()
        
        with open(privateKeyPath, 'rb') as f:
            bytes = f.read()
            encryptor.privateKey = rsa.PrivateKey.load_pkcs1(bytes)

        return encryptor
    
    def save(self, path: str, name: str):
        (publicKeyPath, privateKeyPath) = self.getKeyPath(path, name)

        with open(publicKeyPath, 'w') as f:
            f.write(self.publicKeyPem)

        with open(privateKeyPath, 'wb') as f:
            bytes = self.privateKey.save_pkcs1()
            f.write(bytes)

    def decrypt(self, base64Str: str) -> Dict[str, Any]:
        encrypted = base64.b64decode(base64Str)
        decrypted = rsa.decrypt(encrypted, self.privateKey)
        _json = decrypted.decode()
        _dict = json.loads(_json)
        return _dict
    