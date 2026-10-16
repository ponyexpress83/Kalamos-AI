import Link from "next/link";
import { azienda, recapitoPrivacy } from "@/config/azienda";

export const metadata = { title: "Informativa privacy — Kalamos AI" };

/**
 * Informativa ai sensi dell'art. 13 GDPR per il sito e la demo.
 * Descrive i trattamenti che il codice fa davvero: se ne aggiungi uno
 * (database, nuovo fornitore, cookie di profilazione), aggiorna questa pagina
 * nello stesso commit. Revisione del 16 ottobre 2026 in
 * 10-legale/revisione-informativa.md; resta da far validare a un legale.
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
  const titolare = [
    azienda.ragioneSociale,
    azienda.sede,
    azienda.partitaIva && `P.IVA ${azienda.partitaIva}`,
    azienda.registroImprese,
  ]
    .filter(Boolean)
    .join(" · ");
  const incompleta = !azienda.ragioneSociale || !azienda.sede || !recapito;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accento">Informativa privacy</p>
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-inchiostro">Quali dati trattiamo, e perché</h1>
      <p className="mt-3 mb-6 font-sans text-sm text-stone-500">
        Ai sensi dell'art. 13 del Regolamento (UE) 2016/679 («GDPR»). Riguarda questo sito e la sua demo. Ultimo aggiornamento: 16 ottobre 2026.
      </p>

      {incompleta && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 font-sans text-sm text-amber-900">
          Alcuni dati del titolare sono in corso di inserimento.{recapito ? ` Per qualunque richiesta scrivete a ${recapito}.` : ""}
        </div>
      )}

      <Voce titolo="Titolare del trattamento">
        <p>{titolare || "—"}</p>
        {recapito && (
          <p>
            Per le richieste sui dati personali: <a href={`mailto:${recapito}`} className="underline hover:text-accento">{recapito}</a>
          </p>
        )}
        <p>Non è stato nominato un responsabile della protezione dei dati (DPO).</p>
      </Voce>

      <Voce titolo="1. Richieste di pilota">
        <p>
          <strong>Dati:</strong> nome, email, casa editrice, ruolo, volume e provenienza delle proposte, l'eventuale messaggio. <strong>Finalità:</strong> rispondere e, se lo volete, organizzare il pilota. <strong>Base giuridica:</strong> misure precontrattuali adottate su vostra richiesta (art. 6, par. 1, lett. b).
        </p>
        <p>
          I campi contrassegnati da asterisco servono a rispondere: senza, non possiamo farlo. Gli altri sono facoltativi.
        </p>
        <p>
          Il modulo invia una mail al titolare tramite un servizio di posta; le richieste non vengono salvate in un database. Se l'invio non riesce, la richiesta resta nei log tecnici del fornitore di hosting, per poterla recuperare, per il tempo di conservazione dei log previsto da quel fornitore. <strong>Conservazione:</strong> il tempo necessario a gestire la richiesta e l'eventuale rapporto che ne segue, e comunque non oltre 24 mesi dall'ultimo contatto.
        </p>
      </Voce>

      <Voce titolo="2. Testi caricati per l'analisi">
        <p>
          Quando premete «Analizza», il testo passa dal nostro server all'API di Anthropic per produrre la scheda di lettura. Il server di Kalamos non lo salva. Secondo i suoi termini commerciali, Anthropic non usa input e output dei clienti dell'API per addestrare i modelli e li conserva per un periodo limitato. Il dettaglio è in <Link href="/riservatezza" className="underline hover:text-accento">Riservatezza e dati</Link>.
        </p>
        <p>
          <strong>Base giuridica:</strong> esecuzione del servizio che chiedete (art. 6, par. 1, lett. b). Se il testo contiene dati personali di altre persone, per esempio il nome di chi lo ha scritto o di persone reali descritte nel testo, li trattiamo solo per produrre la scheda, sulla base del legittimo interesse a fornirvi il servizio richiesto (art. 6, par. 1, lett. f).
        </p>
        <p>
          Caricate solo testi che avete titolo a usare, ed evitate di caricare testi di altri senza autorizzazione. La demo non è pensata per testi che contengano dati sanitari o altri dati particolari di persone reali.
        </p>
        <p>
          <strong>Nessuna decisione automatizzata.</strong> La scheda è un supporto alla lettura: non produce decisioni basate unicamente su un trattamento automatizzato ai sensi dell'art. 22 GDPR. Ogni decisione su un manoscritto resta a una persona.
        </p>
      </Voce>

      <Voce titolo="3. Dati nel vostro browser e cookie">
        <p>
          La coda dei manoscritti analizzati, i giudizi dell'editor, la redazione scelta e le decisioni del workspace dimostrativo restano nella memoria locale del browser (localStorage), sul vostro dispositivo. Non li riceviamo. Si cancellano svuotando i dati del sito.
        </p>
        <p>
          Il workspace dimostrativo usa un solo cookie tecnico di sessione (<code>kalamos_session</code>, durata 12 ore), necessario per entrarvi. Memoria locale e cookie tecnico servono solo a far funzionare ciò che chiedete, e per questo non richiedono consenso (art. 122 del Codice in materia di protezione dei dati personali). Non usiamo cookie di profilazione né di terze parti.
        </p>
      </Voce>

      <Voce titolo="4. Statistiche di visita e sicurezza">
        <p>
          Contiamo le visite con Vercel Web Analytics, che non usa cookie e restituisce dati aggregati sulle pagine viste. Per proteggere il servizio, l'indirizzo IP serve a limitare il numero di richieste: il conteggio resta solo nella memoria del server, non viene scritto su disco né in un database e si azzera quando il server si riavvia. Il fornitore di hosting conserva i log tecnici delle richieste per il periodo previsto dal suo servizio.
        </p>
        <p>
          <strong>Base giuridica:</strong> legittimo interesse a misurare l'uso del sito in forma aggregata e a proteggerlo da abusi (art. 6, par. 1, lett. f).
        </p>
      </Voce>

      <Voce titolo="Fornitori che trattano dati per nostro conto">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vercel Inc. — hosting del sito, log tecnici e statistiche di visita (Stati Uniti).</li>
          <li>Anthropic PBC — analisi dei testi (Stati Uniti).</li>
          <li>Resend, Inc. — invio delle mail del modulo di contatto (Stati Uniti).</li>
        </ul>
        <p>
          I trasferimenti fuori dallo Spazio economico europeo avvengono sulla base delle garanzie previste dal Capo V del GDPR: decisione di adeguatezza (art. 45), per i fornitori aderenti al Data Privacy Framework UE-USA, oppure clausole contrattuali standard (art. 46). Potete chiederne copia o descrizione{recapito ? " al recapito indicato sopra" : ""}.
        </p>
      </Voce>

      <Voce titolo="I vostri diritti">
        <p>
          Potete chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati, e opporvi al trattamento basato sul legittimo interesse (artt. 15-22 GDPR){recapito ? ", scrivendo al recapito indicato sopra" : ""}. Rispondiamo entro un mese. Potete anche proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).
        </p>
      </Voce>

      <Voce titolo="Nel pilota">
        <p>
          Con una casa editrice che avvia un pilota, i manoscritti sono dati suoi: Kalamos li tratta come responsabile per suo conto (art. 28 GDPR), con condizioni firmate prima di ricevere qualunque testo. Per quei dati il titolare è la casa editrice.
        </p>
      </Voce>
    </div>
  );
}
