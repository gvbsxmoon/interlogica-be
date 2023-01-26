# interlogica-be
## TECNOLOGIE UTILIZZATE

Semplice backend realizzato con ExpressJS + MongoDB che utilizza mongoose come connettore per mongo e nodemon per restare in ascolto qualora dovesse subire dei
cambiamenti il codice.
Per la parte di sicurezza sono stati utilizzati BCRYPT per salvare password criptate a db, JWT per autorizzare l'accesso ad alcune rotte e dotenv per espandere il
contenuto presente in .env.

*PS: il file .env non vè presente nel repo poichè è stato segnalato all'interno del .gitignore*.

## ERRORI CONOSCIUTI
Seppur presente, il job che dovrebbe aggiornare il prezzo dei prodotti in base alla loro data di commercializzazione è stato integrato con uno script cron e per tanto
in fase di sviluppo non si avrà modo di vedere gli effettivi cambiamenti.

# RUN
Si presuppone di aver già disponibili nodejs ed npm e che la versione di node sia 17+ per evitare problemi di compatibilità. Yarn sarebbe una scelta gradita.

Per far partire il progetto in locale:

`npm install` oppure `yarn`

`npm run dev` oppure `yarn dev`

al termine del processo il terminale restituirà il link locale presso il quale l'app sara disponibile.
