#!/bin/bash

# Mise à jour du système
sudo apt-get update
sudo apt-get upgrade -y

# Installation des dépendances
sudo apt-get install -y curl

# Installation de Node.js (dernière version LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification de l'installation de Node.js
node --version
npm --version

# Installation de Nginx
sudo apt-get install -y nginx

# Installation de PM2 globalement
sudo npm install -g pm2

# Création du répertoire de l'application
sudo mkdir -p /var/www/cvgenerator
sudo chown -R $USER:$USER /var/www/cvgenerator

# Copie des fichiers de l'application
cp -r * /var/www/cvgenerator/

# Installation des dépendances
cd /var/www/cvgenerator
npm install
cd client
npm install
npm run build

# Configuration de Nginx
sudo cp /var/www/cvgenerator/nginx.conf /etc/nginx/sites-available/cvgenerator
sudo ln -s /etc/nginx/sites-available/cvgenerator /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Démarrage de l'application avec PM2
cd /var/www/cvgenerator
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configuration du pare-feu
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

echo "Déploiement terminé !" 