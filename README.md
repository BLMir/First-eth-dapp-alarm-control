# Eth dapp: alarm control
In order to get into the BC world I created a small dapp to store alarms from differents devices and store them in eth block chain.

You can desentralize the website using IPFS separently with this simple comands.
```shell
mkdir dist
sync -r src dist 
rsync -r build/contracts dist 
ipfs add -r dist
ipfs name publish {peer of the src root}
```
