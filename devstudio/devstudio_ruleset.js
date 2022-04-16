console.log("PDT: devstudio/devstudio_ruleset.js");

var tries = 0, pagerDiv;
var rsvListObserver;

//TODO: FEATURE: copy ruleset version list pager on top of the list
function copyPagerToTop() {
    console.log("PDT: copyPagerToTop");
    var rsvPager = document.querySelector("div[editaction=pzRuleset_ShowRuleSetVersion] div.gridActionBottom");
    if(rsvPager) {
        console.log("PDT: copyPagerToTop rsvPager found");
        rsvPager = rsvPager.cloneNode(true);
        var rsvTarget = document.querySelector("div[editaction=pzRuleset_ShowRuleSetVersion]");
        if(rsvTarget) {
            rsvTarget.insertBefore(rsvPager, rsvTarget.firstChild);
            console.log("PDT: copyPagerToTop rsvTarget found");
        }
    } else {
        console.log("PDT: copyPagerToTop rsvPager NOT found");
    }
}

function addRSObserver() {

    //const rsvList = document.querySelector("div[data-node-id='pzRuleSet_ListRuleSetVersions']");
    const rsvList = document.querySelector('div[node_name="pzRuleSet_ListRuleSetVersions"] div.default#PEGA_GRID_SKIN');
    //document.querySelector("div[node_name='pzRuleSet_ListRuleSetVersions']")
    //("table#bodyTbl_right[summary='pyRuleSetVersionsList']");
    //document.querySelector("table[summary='pyRuleSetVersionsList']");

    console.debug(rsvList);
    const rsvListCallback = function (mutationsList, observer) {
        console.log("PDT: rsvListCallback ");
        copyPagerToTop();
    };

    rsvListObserver = new MutationObserver(rsvListCallback);
    rsvListObserver.observe(rsvList, {
        childList: true
        //subtree: true
    })
}

function waitUntilRenderRS() {
    pagerDiv = document.querySelector("div[editaction=pzRuleset_ShowRuleSetVersion] div.gridActionBottom a");
    if (pagerDiv) {
        copyPagerToTop();
        addRSObserver();
    } else {
        tries = tries + 1;
        console.log(tries);
        if (tries > 10) return;
        setTimeout(() => {
            waitUntilRenderRS();
        }, 500);
    }
}

waitUntilRenderRS();