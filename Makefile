.PHONY: help deploy

help:
	@echo "\nCommands:"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

deploy:                 ## run truffle console
	truffle migrate --reset

