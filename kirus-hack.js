(function() {
    // colors!!!!
    const style = document.createElement('style');
    style.innerHTML = `
        #kirus-container { position: fixed; top: 50px; right: 50px; width: 260px; background: #121212; color: #fff; border: 2px solid #00ffcc; border-radius: 8px; z-index: 100000; font-family: sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.7); display: block; }
        #kirus-header { background: #1f1f1f; padding: 12px; cursor: move; text-align: center; font-weight: bold; border-bottom: 1px solid #333; color: #00ffcc; position: relative; }
        #close-btn { position: absolute; right: 10px; top: 10px; cursor: pointer; color: #ff4444; font-size: 14px; font-weight: bold; }
        .kirus-body { padding: 15px; display: flex; flex-direction: column; gap: 12px; }
        .kirus-btn { background: #252525; color: #eee; border: 1px solid #444; padding: 10px; border-radius: 4px; cursor: pointer; font-size: 13px; transition: 0.2s; }
        .kirus-btn:hover { background: #00ffcc; color: #000; }
        .kirus-select { background: #252525; color: white; border: 1px solid #444; padding: 8px; border-radius: 4px; width: 100%; }
        .label { font-size: 11px; color: #888; margin-bottom: -5px; }
    `;
    document.head.appendChild(style);

    const banners = {
        Starter: "starter", Fire: "fire", "Tech Chip": "techChip", Shamrocks: "shamrocks", "Orange Ice Pop": "orangeIcePop", Slime: "slime", Sushi: "sushi", "Falling Blocks": "fallingBlocks", Racetrack: "racetrack", "Football Field": "footballField", "Ice Cream Sandwich": "iceCreamSandwich", "Winter Landscape": "winterLandscape", Leaves: "leaves", "Music Class": "musicClass", "Science Class": "scienceClass", "Art Class": "artClass", Clockwork: "clockwork", "Hockey Rink": "hockeyRink", "Outer Space": "outerSpace", "Soccer Field": "soccerField", Ice: "ice", "Toaster Pastry": "toasterPastry", "Fish Tank": "fishTank", Theater: "theater", Farm: "farm", Spooky: "spooky", "Spooky Cat": "spookyCat", "Spooky Window": "spookyWindow", Frankenstein: "frankenstein", Ghosts: "ghosts", Mummy: "mummy", Spiders: "spiders", Coffin: "coffin", Pumpkins: "pumpkins", "Christmas Tree": "christmasTree", Chalkboard: "chalkboard", Balloons: "balloons", Skateboard: "skateboard", Sunset: "sunset", Tiger: "tiger", "Pirate Map": "pirateMap", Pencil: "pencil", "Road Sign": "roadSign", "Corn Dog": "cornDog", Leaf: "leaf", "Chili Pepper": "chiliPepper", "Love Letter": "loveLetter", Gifts: "gifts", "Winter Train": "winterTrain", "Winter Drive": "winterDrive", Workbench: "workbench", Harvest: "harvest", Chocolate: "chocolate", "Fall Picnic": "fallPicnic", Bookshelf: "bookshelf", "Easter Pattern": "easterPattern", Carrot: "carrot", "Easter Field": "easterField", Garden: "garden", Bakery: "bakery", "Gummy Worm": "gummyWorm", "Basketball Court": "basketballCourt", "Flying Kite": "flyingKite", "Hot Dog": "hotDog", "Japanese Garden": "japaneseGarden", Sandwich: "sandwich", Ruler: "ruler", "Ball Pit": "ballPit", Xylophone: "xylophone", "Holiday Lights": "holidayLights", "Ice Cream Truck": "iceCreamTruck", "Holiday Gift Wrap": "holidayGiftWrap", "Winter Sweater": "winterSweater", "Holiday Ornaments": "holidayOrnaments", Watermelon: "watermelon", Baguette: "baguette", Rollerblades: "rollerblades", Surfboard: "surfboard", Cookout: "cookout", Comic: "comic", Crayon: "crayon", Lightning: "lightning", Baseball: "baseball", "Shamrock Coins": "shamrockCoins", "End Of The Rainbow": "endRainbow", Marker: "marker", Pizza: "pizza", "Alphabet Soup": "alphabetSoup"
    };

    // --- UI Creation ---
    const container = document.createElement('div');
    container.id = 'kirus-container';
    let bannerOptions = Object.entries(banners).map(([name, val]) => `<option value="${val}">${name}</option>`).join('');
    
    container.innerHTML = `
        <div id="kirus-header">Kirus's hack.<span id="close-btn">X</span></div>
        <div class="kirus-body">
            <button class="kirus-btn" id="run-rewards">Get Max Daily Rewards</button>
            <button class="kirus-btn" id="run-blooks">Unlock All Blooks</button>
            <span class="label">Tap "m" to toggle hack</span>
            <select id="banner-val" class="kirus-select">${bannerOptions}</select>
            <button class="kirus-btn" id="run-banner">Apply Banner</button>
        </div>
    `;
    document.body.appendChild(container);

    // "m" to toggle (chnage if you want)
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            container.style.display = (container.style.display === 'none') ? 'block' : 'none';
        }
    });

    // the close forever
    document.getElementById('close-btn').onclick = () => {
        container.remove();
    };

    // hehe
    document.getElementById('run-rewards').onclick = async () => {
        const gameId = "60101da869e8c70013913b59";
        try {
            const { t } = await fetch("https://play.blooket.com/api/playersessions/solo", {
                body: JSON.stringify({ gameMode: "Factory", questionSetId: gameId }),
                method: "POST", credentials: "include", headers: {'Content-Type': 'application/json'}
            }).then(r => r.json());
            await fetch("https://play.blooket.com/api/users/add-rewards", {
                body: JSON.stringify({ t, addedTokens: 500, addedXp: 300 }),
                method: "PUT", credentials: "include", headers: {'Content-Type': 'application/json'}
            });
            alert("Rewards Sync Successful");
        } catch (e) { alert("Execution Error"); }
    };

    document.getElementById('run-blooks').onclick = () => {
        const path = window.location.pathname;
        if (path.startsWith("/blooks")) {
            const hook = Object.values(document.querySelector("[class*=BlooksWrapper_content]"))[0].return.memoizedState.next;
            const list = [];
            hook.next.memoizedState.forEach(b => list.push({...b, quantity: 1}));
            hook.next.queue.dispatch(list);
            alert("Blooks Unlocked");
        } else if (path.startsWith("/play/lobby")) {
            Object.values(document.querySelector('#app > div > div'))[1].children[0]._owner.stateNode.setState({ unlocks: { includes: () => true } });
            alert("Lobby Access Granted");
        } else { alert("Go to Blooks or Lobby"); }
    };

    document.getElementById('run-banner').onclick = () => {
        const val = document.getElementById('banner-val').value;
        try {
            const fiber = Object.values(document.querySelector("#app>div>div"))[1].children[0]._owner;
            fiber.stateNode.props.liveGameController.setVal({
                path: "c/" + fiber.stateNode.props.client.name + "/bg",
                val: val
            });
            alert("Banner Applied");
        } catch (e) { alert("Lobby Active State Not Found"); }
    };

    // the thing which let ya drag the top part.
    let m1=0, m2=0, m3=0, m4=0;
    const header = document.getElementById('kirus-header');
    header.onmousedown = (e) => {
        m3 = e.clientX; m4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            m1 = m3 - e.clientX; m2 = m4 - e.clientY;
            m3 = e.clientX; m4 = e.clientY;
            container.style.top = (container.offsetTop - m2) + "px";
            container.style.left = (container.offsetLeft - m1) + "px";
        };
    };
})();
