### Introduction
This is repository of innometrics cient system for linux os.

#### Installation
To install this system on your local machine, to begin gathering data from your machine.

* Get last built release as innometrics.tar.gz file from https://github.com/Valt25/innometrics-os-linux-agent/releases
   
    Can be done by next command, but using browser it will be much faster
    
    `curl -s https://api.github.com/repos/Valt25/innometrics-os-linux-agent/releases/latest | grep "browser_download_url" | cut -d : -f 2,3 | tr -d \" | xargs wget`

* Then you need to unzip archive and cd in created dir(WARNING: this wil create new folder "innometrics" and rewrite files with same names)
    
    `mkdir innometrics`
    
    `tar -xvzf innometrics.tar.gz -C innometrics`
    
    `cd innometrics`
* To install all dependencies you have to run install.sh script

    `./install.sh`
    
    It will
    * Download node and npm binaries to this folder
    * Install all npm dependencies
    * Create sqlite3 database file locally in this folder
    
* To run this system(either local server that is accumulate all data locally and then sends to centralized server, either all sensor list)

    `./run.sh`
    
    It will run 3 programs in parallel. To stop all, you just need to press ctrl+c.
    
#### Usage
When you first run run.sh file, you will get main window opened, you have to push login button and then enter email and password(you have to have account on http://innometrics.guru/)
#### Prerequisites
We assume that all Ubuntu and Debian OSs have git, tar, and wget binaries in path by default. If not try next command:

`sudo apt-get install git`

`sudo apt-get install tar`

`sudo apt-get install wget`

This software was tested on Ubuntu 18.04 LTS
