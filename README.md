### Introduction
This is repository of innometrics cient system for linux os.

#### Installation
To install this system on your local machine, to begin gathering data from your machine.

* Get last built release as innometrics.tar.gz file from https://github.com/Valt25/innometrics-os-linux-agent/releases
    
* To install all dependencies you have to run install.sh script

    `./install.sh`
    
    It will
    * Download node and npm binaries to this folder
    * Install all npm dependencies
    * Create sqlite3 database file locally in this folder
    
* To run this system(either local server that is accumulate all data locally and then sends to centralized server, either all sensor list)

    `./run.sh`
    
    It will run 2 processes in parallel. To stop both, you just need to press ctrl+c.
    
#### Usage

#### Prerequisites
We assume that all Ubuntu and Debian OSs have git, tar, and wget binaries in path by default. If not try next command:

`sudo apt-get install git`

`sudo apt-get install tar`

`sudo apt-get install wget`
