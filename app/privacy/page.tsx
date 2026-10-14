import Link from "next/link";
import { azienda, recapitoPrivacy } from "@/config/azienda";

export const metadata = { title: "Informativa privacy — Kalamos AI" };

/**
 * Informativa ai sensi dell'art. 13 GDPR per il sito e la demo.
 * Descrive i trattamenti che il codice fa davvero: se ne aggiungi uno
 * (database, nuovo fornitore, cookie di profilazione), aggiorna questa pagina
 * nello stesso commit. Testo da far rivedere a un legale.
 */

function Voce({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-carta-scura py-5">
      <h2 className="mb-2 font-serif text-lg font-semibold text-inchiostro">{titolo}</h2>
      <div className="space-y-2 font-sans text-sm leading-relaxed text-stone-600">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const recapito = recapitoPrivacy();
  const titolare = [azienda.ragioneSociale, azienda.sede, azienda.partitaIva && `P.IVA ${azienda.partitaIva}`]
    .filter(Boolean)
    .join(" · ");
  const incompleta = !azienda.ragioneSociale || !recapito;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">Informativa privacy</p>
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-inchiostro">Quali dati trattiamo, e perché</h1>
      <p className="mt-3 mb-6 font-sans text-sm text-stone-500">Ai sensi dell'art. 13 del Regolamento (UE) 2016/679. Ultimo aggiornamento: 14 ottobre 2026.</p>

      {incompleta && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 font-sans text-sm text-amber-900">
          I dati del titolare sono in corso di inserimento. Per qualunque richiesta nel frattempo usate il modulo della pagina «Richiedi un pilota».
        </div>
      )}

      <Voce titolo="Titolare del trattamento">
        <p>{titolare || "—"}</p>
        {recapito && (
          <p>
            Recapito per le richieste sui dati personali: <a href={`mailto:${recapito}`} className="underline hover:text-accento">{recapito}</a>
          </p>
        )}
      </Voce>

      <Voce titolo="1. Richieste di pilota">
        <p>
          Con il modulo «Richiedi un pilota» raccogliamo nome, email, casa editrice, ruolo, volume e provenienza delle proposte e l'eventuale messaggio. Li usiamo solo per rispondere e, se lo volete, per organizzare il pilota.
        </p>
        <p>
          Base giuridica: misure precontrattuali richieste da voi (art. 6.1.b). Il modulo invia una mail al titolare tramite un servizio di posta; non salviamo le richieste in un database. Le conserviamo per il tempo necessario a gestire la richiesta e l'eventuale rapporto che ne segue, e comunque non oltre 24 mesi dall'ultimo contatto.
        </p>
      </Voce>

      <Voce titolo="2. Testi caricati per l'analisi">
        <p>
          Quando premete «Analizza», il testo passa dal nostro server all'API di Anthropic per produrre la scheda di lettura. Il server di Kalamos non lo salva. Anthropic non usa input e output dei clienti commerciali per addestrare i modelli e li conserva per un periodo limitato secondo i propri termini. Il dettaglio è in <Link href="/riservatezza" className="underline hover:text-accento">Riservatezza e dati</Link>.
        </p>
        <p>Se il testo contiene dati personali, per esempio il nome di chi lo ha scritto, li trattiamo solo per produrre la scheda.</p>
      </Voce>

      <Voce titolo="3. Dati nel vostro browser">
        <p>
          La coda dei manoscritti analizzati, i giudizi dell'editor, la redazione scelta e le decisioni del workspace dimostrativo restano nella memoria locale del browser (localStorage), sul vostro dispositivo. Non li riceviamo. Si cancellano svuotando i dati del sito.
        </p>
        <p>
          Il workspace dimostrativo usa un solo cookie tecnico di sessione (<code>kalamos_session</code>, durata 12 ore), necessario per entrarvi. Non usiamo cookie di profilazione né di terze parti.
        </p>
      </Voce>

      <Voce titolo="4. Statistiche di visita e sicurezza">
        <p>
          Contiamo le visite con Vercel Web Analytics, che non usa cookie e restituisce dati aggregati. Per proteggere il servizio, l'indirizzo IP serve a limitare il numero di richieste: il conteggio resta solo nella memoria del server, non viene scritto su disco né in un database e si azzera quando il server si riavvia. Il fornitore di hosting conserva i log tecnici delle richieste per un periodo limitato.
        </p>
      </Voce>

      <Voce titolo="Fornitori che trattano dati per nostro conto">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vercel Inc. — hosting del sito e statistiche di visita (Stati Uniti).</li>
          <li>Anthropic PBC — analisi dei testi (Stati Uniti).</li>
          <li>Resend — invio delle mail del modulo di contatto (Stati Uniti).</li>
        </ul>
        <p>
          I trasferimenti fuori dall'Unione europea avvengono sulla base delle garanzie previste dagli artt. 44 e seguenti del GDPR: decisione di adeguatezza EU-USA (Data Privacy Framework) per i fornitori certificati, altrimenti clausole contrattuali standard.
        </p>
      </Voce>

      <Voce titolo="I vostri diritti">
        <p>
          Potete chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opporvi al trattamento (artt. 15-22 GDPR){recapito ? ", scrivendo al recapito indicato sopra" : ""}. Potete anche proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).
        </p>
      </Voce>

      <Voce titolo="Nel pilota">
        <p>
          Con una casa editrice che avvia un pilota, i manoscritti sono dati suoi: Kalamos li tratta come responsabile per suo conto (art. 28 GDPR), con condizioni firmate prima di ricevere qualunque testo.
        </p>
      </Voce>
    </div>
  );
}
