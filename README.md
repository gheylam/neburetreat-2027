# Group holiday — location briefing and trip pack

A simple summer-coloured site for a UK group trip.

- `/` is the committee comparison of Loveholidays all-inclusive options (health, transport, beach, shops, hospital access, food, and late April / early May weather). Shared +/− votes need the Vercel Redis store.
- `/group` is the shorter group shortlist.
- `/info-pack` is the live trip pack for **Fuengirola, Sunday 2 May – Wednesday 5 May 2027**, at Hotel Monarque Cendrillón. It has the two board prices (all inclusive and half board), the Sunday-arrival reason, two days of annual leave (Tuesday and Wednesday — Monday is a UK bank holiday), UK airport travel as a separate extra, the shared holiday savings pot + monthly payment plan (with example schedules), the separate money WhatsApp for monthly audits, and the questions people actually ask.

This is a decision and briefing site, not a booking tool.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147), [http://127.0.0.1:43147/group](http://127.0.0.1:43147/group), and [http://127.0.0.1:43147/info-pack](http://127.0.0.1:43147/info-pack).

Print either page if you want a paper copy.

Shared votes on the live comparison page need `REDIS_URL` on the Vercel project. Local `npm run dev` shows the cards but cannot share votes unless you use `vercel dev`.

## What people on the trip pack need to do

1. Confirm Tuesday 4 May and Wednesday 5 May 2027 as annual leave (Monday 3 May is a UK bank holiday).
2. Vote all inclusive vs half board on the WhatsApp poll — there is no default board.
3. Say they are in by Friday 2 October, join the money WhatsApp, and start paying into Hey’s shared holiday savings pot (£19 + first month, then the monthly plan).
4. Budget separately for getting to Gatwick and home from Luton — that travel is not in Lucy’s prices.
