cd ~/thomas-scheduler

echo "Pulling latest changes"
sudo git checkout master
sudo git fetch origin
sudo git pull

echo "Restarting backend"
sudo pm2 stop backend
cd ~/thomas-scheduler/backend
sudo pm2 start backend

echo "Rebuild frontend and restart nginx"
cd ~/thomas-scheduler/frontend
sudo npm run build
sudo systemctl restart nginx