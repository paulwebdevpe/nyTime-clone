# Progetto New York Times Clone

Questo è un progetto basato su React che recupera articoli di notizie dall'API del New York Times e li visualizza agli utenti. Include funzionalità come il salvataggio degli articoli, l'aggiornamento del profilo utente e la gestione dell'autenticazione degli utenti tramite Firebase.

## Home Page 

![Home-git](https://github.com/user-attachments/assets/610870ca-d495-4b78-b989-e44bc8c16d03)

## Caratteristiche
- **Top Stories**: Visualizza le principali notizie dall'API del New York Times.
- **Dettagli dell'articolo**: Visualizza informazioni dettagliate su un singolo articolo.
- **Autenticazione utente**: Permette agli utenti di accedere, aggiornare il proprio profilo e eliminare il proprio account.
- **Salvataggio degli articoli**: Gli utenti possono salvare articoli nel loro profilo e eliminarli.
- **Design responsivo**: Il sito è completamente responsivo, adattandosi a diverse dimensioni di schermo.

## Tecnologie Utilizzate
- **React**: Una libreria JavaScript per costruire interfacce utente.
- **Redux**: Per la gestione dello stato globale dell'app.
- **Firebase**: Per l'autenticazione e l'archiviazione dei dati utente.
- **Tailwind CSS**: Un framework CSS a base di utility per lo stile.
- **Axios**: Per effettuare richieste HTTP all'API del New York Times.
- **XML2JS**: Per analizzare i dati XML dai feed RSS.
- **React Router**: Per la navigazione tra le diverse viste.
- **React Toastify**: Per visualizzare notifiche.

## Installazione

1. **Clona il repository**:

    ```bash
    git clone https://github.com/paulwebdevpe/nyTime-clone.git

2. **Installa le dipendenze**:

    ```bash
    npm install

3. **Configura le variabili d'ambiente creando un file .env nella cartella principale e aggiungi la tua API key del New York Times**:

    ```bash
    VITE_API_KEY=la-tua-nyt-api-key

4. **Avvia il server di sviluppo**:

    ```bash
    npm run dev


5. **Apri il tuo browser e vai su http://localhost:3000 per visualizzare l'app.**:

## Rotte

- **/**: Pagina principale che visualizza gli articoli principali.
- **/:sectionId**: Visualizza gli articoli di una sezione specifica.
- **/article**: Visualizza un articolo individuale.
- **/login**: Pagina di login dell'utente.
- **/profile**: Pagina del profilo utente, dove gli utenti possono aggiornare il proprio profilo e visualizzare gli articoli salvati.

## Configurazione di Firebase

Assicurati di avere un progetto Firebase configurato e le credenziali di Firebase correttamente impostate:

1. Vai alla Console di Firebase: https://console.firebase.google.com/
2. Crea un nuovo progetto e aggiungi Firebase Authentication e Firestore.
3. Ottieni le tue credenziali di Firebase e configurale nel file firebase/setup.js.


