cd /home/adambotha007/thomas-scheduler

echo "Pulling latest changes"
git checkout master
git fetch origin
git pull

echo "Restarting backend"
sudo pm2 stop backend
cd /home/adambotha007/thomas-scheduler/backend
sudo pm2 start backend.js

echo "Rebuild frontend and restart nginx"
cd /home/adambotha007/thomas-scheduler/frontend
sudo npm run build
sudo systemctl restart nginx