# zenbot 3

![zenbot logo](https://rawgit.com/carlos8f/zenbot/master/assets/zenbot_clean.png)

> “To follow the path, look to the master, follow the master, walk with the master, see through the master, become the master.”
> – Zen Proverb

- Follow zenbot [on Twitter!](https://twitter.com/zenbot_btc)
- Check out zenbot's [live feed!](https://zenbot.s8f.org/)
- Join the discussion on [Reddit!](https://www.reddit.com/r/Bitcoin/comments/4xqo8q/announcing_zenbot_3_your_new_btcethltc_trading/)!

## Updates

- **3.1.2** - Relaxed backfill timeout. Backfill is slower to let reducer catch up. Reducer report interval -> 30s, Trade report interval -> 30s

- **3.1.1** - Updated zenbrain version. Please run `./update.sh`.

- **3.1.0** - Major logic update. Much of the default trade logic reprogrammed. Moved default logic to `./default_logic.js`. RSI now backfills by default, reconfigured to 15m intervals. Safe to drop your zenbrain DB before this update.

## Description

zenbot is an automated cryptocurrency trading bot. It runs on node.js and MongoDB and is fully open-sourced. A plugin architecture is included that allows any exchange, trade strategy, or currency pair to be supported.

- Out of the box, zenbot is an AI-powered trade advisor (gives you buy or sell signals while watching live data).
- Default support for [GDAX](https://gdax.com/) is included, so if you have a GDAX account, enable bot trades by simply putting your GDAX API key in `config.js` and setting what currency pair to trade.
- Default support for other exchanges is ongoing.
- Trade strategy is fully exposed in the config file. This allows you to have full control over the bot's actions and logic. For example, instead of trading on GDAX, you could trade on a different exchange or currency pair by implementing a few lines of JavaScript.
- A live candlestick graph is provided via a built-in HTTP server.

HOWEVER. BE AWARE that once you hook up zenbot to a live exchange, the damage done is your fault, not mine! **As with buying bitcoin in general, risk is involved and caution is essential. bitcoin is an experiment, and so is zenbot.**

## Screenshot

![screenshot](https://raw.githubusercontent.com/carlos8f/zenbot/master/assets/zenbot_web_ui.png)

## Quick-start

### 1. Requirements: [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/download-center)

#### Windows - I don't support it.

If you're having an error on Windows and you're about to give up, it's probaby because Node.js is generally broken on Windows and you should try running on a Linux docker container or a Mac instead.

If you're still insistent on using Windows, you'll have to fork zenbot, fix it yourself, and I'll accept a Pull Request.

### 2. Install zenbot 3:

```
git clone https://github.com/carlos8f/zenbot.git
cd zenbot
npm install
```

### 3. Edit `config.js` with API keys, database credentials, trade logic, etc.

### 4. Run zenbot on the exchange:

```
./run.sh
```

### 5. Open the live graph URL provided in the console.

To access the CLI,

```
zenbot

  Usage: zenbot [options] [command]

  Commands:

    server [options]            launch the server
    launch [options] [cmds...]  launch multiple commands
    map [options]               map
    reduce [options]            reduce
    run                         run
    sim [options]               sim

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

The `./run.sh` script combines `launch map --backfill reduce run server`, so use the CLI to access the other commands.

### 6. Simulation

Once backfill has finished, run a simulation:

```
zenbot sim [--verbose]
```

Zenbot will return you a list of virtual trades, and an ROI figure. Open the URL provided in the console (while running the server) to see the virtual trades plotted on a candlestick graph. Tweak `config.js` for new trade strategies and check your results this way.

Example simulation graph: https://zenbot.s8f.org/?sim_id=9cb6ac63f85168e3&selector=gdax.BTC-USD&period=6h&limit=2000

#### About the default trade logic in `default_logic.js`

- uses [GDAX](https://gdax.com/) API
- watches/trades BTC/USD
- acts at 1m increments (ticks), but you can configure to act quicker or slower.
- computes 14-period 15m RSI
- considers `RSI >= 70` overbought and `RSI <= 20` oversold
- trades 95% of current balance, market price

You can tweak the JS from there to use bitfinex, or trade ETH, or whatever. After tweaking `default_logic.js`, Use `zenbot sim` to check your strategy against historical trades.

Note that simulations always end on Wednesday 5pm PST, and run for a max 90 days, to ensure consistency of results.

Auto-learn support and more exchange support will come soon. Will accept PR's :) With the 3.x plugin architecture, external plugins are possible too (published as their own repo/module).

### 7. Web console

When the server is running, and you have visited the `?secret` URL provided in the console, you can access an aggregated, live feed of log messages at `http://localhost:3013/logs`. Example:

![screenshot](https://raw.githubusercontent.com/carlos8f/zenbot/master/assets/zenbot_web_logs.png)

## FAQ

### Can I use zenbot with [X] exchange?

Yes! As long as that exchange has a public API, you can find a plugin (or write one) to interact with that exchange. I accept pull requests if you want to contribute [X] exchange support.

### Why open source?

There is a general lack of open source bots, especially ones with AI. Since I learned how to code by reverse engineering, I publish code so others can do the same, and by doing so I'm saying thanks to Satoshi, Torvalds, djb, et. al for devoting their lives to open source. It might be against my "selfish interest" but in the end it's best for everyone. Plus, I still own the copyright.

### Were there any incidents when the bot's trade made a loss?

I have seen losses in the simulator, so it's possible. It only takes a few minutes of machine learning to gain a comfortable (albeit virtual) profit margin though. If the bot starts losing money, you can always step in and manual trade or shut the bot down to prevent more loss.

### Based on what criteria does the bot decide to close a trade?

zenbot always trades with the "market" flag, i.e. the order never goes on the books, and the trade goes through with whatever price the last system trade was at. This way, zenbot never needs to cancel orders or compare prices.

### What does [bot] not enough currency to buy! mean?

It means the bot tried to buy BTC, but had not enough USD balance to do that. The volume counter resets anyway. If you feel comfortable investing, you can deposit USD in your GDAX account and zenbot will use that the next time the trade signal triggers.

## Reading assignment: Systematic trading using neural networks

In mathematical terms, Artificial neural networks (ANNs) are universal function approximators, meaning that given the right data and configured correctly, they can capture and model any input-output relationships. This removes the need for human interpretation of charts to determine entry/exit signals.

As ANNs are essentially non-linear statistical models, their accuracy and prediction capabilities can be both mathematically and empirically tested. In various studies, authors have claimed that neural networks used for generating trading signals given various technical and fundamental inputs have significantly outperformed buy-hold strategies as well as traditional linear technical analysis methods when combined with rule-based expert systems.

While the advanced mathematical nature of such adaptive systems has kept neural networks for financial analysis mostly within academic research circles, in recent years more user friendly neural network software has made the technology more accessible to traders.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Technical_analysis#Systematic_trading)

## Donate

P.S., some have asked for how to donate to Zenbot development. I accept donations at **my Bitcoin address** Here:

### carlos8f's BTC

`187rmNSkSvehgcKpBunre6a5wA5hQQop6W`

![zenbot logo](https://s8f.org/files/bitcoin.png)

thanks!

## Discuss

Join the [discussion on Reddit](https://www.reddit.com/r/Bitcoin/comments/4xqo8q/announcing_zenbot_3_your_new_btcethltc_trading/)!
- - -

### License: MIT

- Copyright (C) 2016 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2016 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
