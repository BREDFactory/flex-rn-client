#!/bin/bash
if [ -z "$VERSION_CODE" ]
then
	export VERSION_CODE="1"
fi
if [ -z "$VERSION_NAME" ]
then
	export VERSION_NAME="0"
fi