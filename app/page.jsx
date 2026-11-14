'use client';

import { useEffect, useRef, useState } from 'react';
import StayCard from './components/StayCard';
import ExperienceCard from './components/ExperienceCard';
import FoodCard from './components/FoodCard';
import { getKyotoReply } from './kyoto-reply';

const sampleRequest = 'Plan a weekend in Kyoto for two';
const cardComponents = { stay: StayCard, experience: ExperienceCard, food: FoodCard };

export default function TripPlanner() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeReply, setActiveReply] = useState(null);
  const thread = useRef(null);
  const retryButton = useRef(null);
  const timer = useRef(null);
  const failureUsed = useRef(false);
  const busy = activeReply !== null;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!messages.length) return;
    const latest = thread.current.querySelector('.message-pair:last-child .assistant-message');
    latest?.scrollIntoView({ block: 'nearest' });
    retryButton.current?.focus({ preventScroll: true });
  }, [messages]);

  function requestReply(index) {
    const params = new URLSearchParams(window.location.search);
    setActiveReply(index);
    timer.current = setTimeout(() => {
      const failOnce = params.get('fail') === 'once';
      const failed = failOnce && !failureUsed.current;
      if (failed) failureUsed.current = true;
      setMessages(previous => previous.map((entry, position) =>
        position === index
          ? { ...entry, status: failed ? 'error' : 'ready', cards: getKyotoReply(params.get('food')) }
          : entry,
      ));
      setActiveReply(null);
    }, 950);
  }

  function send(request) {
    if (!request.trim() || busy) return;
    setMessages(previous => [...previous, { request: request.trim(), status: 'thinking' }]);
    setDraft('');
    requestReply(messages.length);
  }

  function retry(index) {
    if (busy) return;
    setMessages(previous => previous.map((entry, position) =>
      position === index ? { ...entry, status: 'thinking' } : entry,
    ));
    requestReply(index);
  }

  return (
    <>
      <header className="masthead">
        <div className="mast-inner">
          <div className="brand"><span className="brand-mark" aria-hidden="true">✳</span> Trip planner</div>
          <div className="trip-label"><strong>Kyoto, Japan</strong><span>11–13 April 2025 · 2 guests</span></div>
        </div>
      </header>
      <main ref={thread} className="thread overflow-y-auto" aria-label="Trip planner conversation">
        <div className="thread-inner">
          {messages.length === 0 && (
            <section className="intro">
              <p className="eyebrow">A two-night trip</p>
              <h1>A weekend in Kyoto</h1>
              <p>One place to stay, one thing to do and one place to eat.</p>
              <button type="button" className="suggestion" onClick={() => send(sampleRequest)}>
                {sampleRequest} <span aria-hidden="true">↗</span>
              </button>
            </section>
          )}
          <div className="messages grid gap-3.5" role="log" aria-label="Messages" aria-live="polite">
            {messages.map(({ request, status, cards }, index) => (
              <div className="message-pair grid gap-3.5" key={index}>
                <p className="user-message">{request}</p>
                <section className="assistant-message">
                  <p className="eyebrow assistant-name">Trip planner</p>
                  {status === 'thinking' && (
                    <div className="thinking">
                      <span className="sr-only">Thinking</span>
                      <span className="dot" aria-hidden="true" />
                      <span className="dot" aria-hidden="true" />
                      <span className="dot" aria-hidden="true" />
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="error-bubble">
                      <p>I couldn’t load your Kyoto weekend suggestions.</p>
                      <button ref={retryButton} className="retry" type="button" disabled={busy} onClick={() => retry(index)}>
                        Try again
                      </button>
                    </div>
                  )}
                  {status === 'ready' && (
                    <>
                      <p className="reply-intro">Here are three ideas for your Kyoto weekend, 11 to 13 Apr.</p>
                      <div className="cards grid gap-2.5">
                        {cards.map(({ cardType, details }) => {
                          const Card = cardComponents[cardType];
                          return <Card key={cardType} details={details} />;
                        })}
                      </div>
                    </>
                  )}
                </section>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="compose">
        <form className="composer" aria-busy={busy} onSubmit={event => { event.preventDefault(); send(draft); }}>
          <label className="sr-only" htmlFor="message">Your trip request</label>
          <input id="message" name="message" value={draft} onChange={event => setDraft(event.target.value)}
            placeholder="Ask about your Kyoto weekend…" autoComplete="off" disabled={busy} required />
          <button type="submit" disabled={busy}>Send <span aria-hidden="true">↑</span></button>
        </form>
      </footer>
    </>
  );
}
