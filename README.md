# Jonglera 🎮

<img src="https://lh3.googleusercontent.com/CsdmcGsStRt0acBK9UKk1hUJ_Gk5RQBjLrLlYgB0bIRKALFEyqWWp3Ig9_W71uJfB30=s180-rw" width="400" />

Managing stress and cognition in stress-related disorders: Jonglera, a digital coach for a sustainable life

Research project In order to provide individuals instruments for managing stress and cognition in stress-related disorders, an AI-based digital companion, or coach is being developed in a collaboration between Umeå University, Karlstad University and the stress rehabilitation clinic at the Västerbotten County Council.

The purpose with the project is to develop AI-based person-tailored decision support in the form of a digital coach for managing stress, fatigue, and tiredness, and to provide cognitive support in the process of going back to work when having a stress-related disease.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#pages)
3. [Architecture](#providers)
4. [More info](#i18n)

## <a name="getting-started"></a>Getting Started

To test Jonglera in an Android device, install the latest version of the Ionic CLI and run:

```bash
ionic cordova run android
```

## Features

Jonglera has an intelligent coaching avatar that suggests some activities related with major goals, such as 
improving physical activities and healthy habits. 

<img src="https://people.cs.umu.se/esteban/proj/img/portfolio/jonglera2.png" width="400" />

First, it is necessary to pick an avatar that will be your coach. The coach can be 
personalized and it depends on your selection, the feedback responses will change.

<img src="https://people.cs.umu.se/esteban/proj/img/portfolio/jonglera3.png" width="400" />

Jonglera has three main services: 1) track physical activities using internal sensors; 2) manage activities during your day (calendar and list activities); and 3) define your main goals.

## Architecture

Jonglera is an agent-based platform with three main components or nodes: 1) the mobile node (this GitHub software), which contains different modules to display user information, modules for input/output exchange, for getting data form internal sensors of the mobile phone, and a module for storing information; 2) a server node, where our agent platform and  an argumentation system run (provided by servers in the Department of Computing Science at Umeå university); and 3) a knowledge repository node, which is an ontology-based repository (http://acktus.cs.umu.se) for obtaining, updating, storing user information.

<img src="https://people.cs.umu.se/esteban/proj/img/portfolio/jonglera_arch.png" width="400" />


### User

The `User` provider is used to authenticate users through its
`login(accountInfo)` and `signup(accountInfo)` methods, which perform `POST`
requests to an API endpoint that you will need to configure.

### Api

The `Api` provider is a simple CRUD frontend to an API. Simply put the root of
your API url in the Api class and call get/post/put/patch/delete 

## More info

    Scientific outputs and more information about this project can be found in https://www.umu.se/en/research/projects/managing-stress-and-cognition-in-stress-related-disorders-a-digital-coach-for-a-sustainable-life/

