# README

## Objectif

L'objectif est d'avoir à la fois :

- Une application complète qui permet de créer et d'éditer des Stories qui se déroulent dans un World fourni par la World-factory
- Une API publique qui permet de modifier ces Stories depuis une autre application (par exemple, dans le Game-Studio pour ajouter un événement)

L'architecture technique prévue est une pile MERN (MongoDB, Express, React, Node.js).

## Travail en cours

Gestion des Evénements et des Situations.

## Description du principe

En base de données simulée (local-forage) on a un objet Worlds et un objet Stories qui contiennent respectivement les données des mondes et des histoires dans une table.

Pour travailler sur une Story, on la charge en mémoire locale.
Toutes les entités sont alors copiées dans la base de données locale.

## TODO

- présenter une Story avec le slider pour se promener dans le temps
- charger une Story et les données de son World
- quitter une Story après l'avoir sauvegarder
- gérer les versions d'une Story
- gérer les versions du World d'une Story
