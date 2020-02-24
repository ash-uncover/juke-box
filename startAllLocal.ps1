Start-Process -FilePath "./tribes-database/start.bat" -WorkingDirectory "./tribes-database/"
Start-Process -FilePath "./tribes-server/start.bat" -WorkingDirectory "./tribes-server/"
Start-Process -FilePath "./tribes-front/start.bat" -WorkingDirectory "./tribes-front/"
