"""Run: python3 -m http.server 8099 &  then  python3 qa/qa.py
Overflow sweep with each of five offer cards opened one at a time,
channel-partner preselect, brief validation and Basin payloads."""
import sys, json
from urllib.parse import parse_qs
from playwright.sync_api import sync_playwright
B="http://localhost:8099"; fails=[]
def chk(ok,msg):
    print(("PASS " if ok else "FAIL ")+msg)
    if not ok: fails.append(msg)
with sync_playwright() as p:
    br=p.chromium.launch(executable_path="/opt/pw-browsers/chromium",args=["--no-sandbox"])
    for w in (320,360,390,430,768,1440):
        pg=br.new_page(viewport={"width":w,"height":900}); errs=[]
        pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.add_style_tag(content="html{scroll-behavior:auto!important}") if False else None
        pg.goto(B+"/index.html"); pg.wait_for_timeout(400)
        pg.add_style_tag(content="html{scroll-behavior:auto!important}*{transition-duration:0s!important}")
        tiers=pg.query_selector_all("[data-tier]")
        chk(len(tiers)==5,f"{w}: five cards")
        names=[t.query_selector(".tier__name").inner_text().strip() for t in tiers]
        chk(names==["Premium Story","Single Story","Channel Partner","Production Partner","Fractional Producer"],f"{w}: order {names}")
        for i,t in enumerate(tiers):
            t.query_selector(".tier__toggle").scroll_into_view_if_needed(); t.query_selector(".tier__toggle").click(); pg.wait_for_timeout(250)
            openn=pg.eval_on_selector_all("[data-tier]","e=>e.filter(x=>x.dataset.open==='true').length")
            ov=pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
            chk(openn==1 and ov<=0,f"{w}: card {i} open={openn} overflow={ov}")
        chk(not errs,f"{w}: no page errors {errs}"); pg.close()
    # contact preselect + payload
    ctx=br.new_context(viewport={"width":390,"height":900}); pg=ctx.new_page(); posts=[]
    def route(r):
        posts.append(r.request.post_data); r.fulfill(status=200,body="{}",content_type="application/json")
    pg.route("https://usebasin.com/**",route)
    pg.goto(B+"/contact.html?package=channel-partner"); pg.wait_for_timeout(300)
    sel=pg.query_selector('select[name="package"]') or pg.query_selector("select")
    chk(sel.input_value()=="channel-partner","contact preselects channel-partner")
    opts=[o.get_attribute("value") for o in sel.query_selector_all("option")]
    chk(opts.index("channel-partner")==opts.index("single-story")+1,f"select order {opts}")
    # brief
    pg.goto(B+"/brief.html?package=channel-partner"); pg.wait_for_timeout(300)
    chk(pg.is_visible("#channel-track"),"channel track visible when chosen")
    chk("$" not in pg.inner_text("body"),"no dollar sign on brief")
    pg.click("button[type=submit]"); pg.wait_for_timeout(200)
    chk(len(posts)==0 and pg.eval_on_selector_all("#brief [data-invalid]","e=>e.length")==4,"4 required fields block send")
    pg.fill("#b-name","Test"); pg.fill("#b-email","t@example.com"); pg.fill("#b-org","Org"); pg.fill("#b-goal","Goal")
    pg.fill("#c-name","My channel"); pg.check('input[name=runs][value=YouTube]')
    pg.click("button[type=submit]"); pg.wait_for_timeout(400)
    d=parse_qs(posts[-1]) if posts else {}
    chk(d.get("channel_name")==["My channel"] and d.get("package")==["Channel Partner"] and d.get("runs")==["YouTube"],f"payload {d}")
    chk(pg.is_visible("#brief-done"),"success shown")
    # other track omits channel fields; failure keeps answers
    pg.goto(B+"/brief.html"); pg.wait_for_timeout(200)
    chk(not pg.is_visible("#channel-track"),"channel track hidden by default")
    pg.unroute("https://usebasin.com/**"); pg.route("https://usebasin.com/**",lambda r:r.fulfill(status=500,body="x"))
    pg.fill("#b-name","T"); pg.fill("#b-email","t@example.com"); pg.fill("#b-org","O"); pg.fill("#b-goal","G")
    pg.click("button[type=submit]"); pg.wait_for_timeout(400)
    chk(pg.is_visible("#brief-failed") and not pg.is_visible("#brief-done") and "name: T" in pg.input_value("#brief-copy"),"failed send keeps answers, no false success")
    br.close()
print("FAILS:",fails); sys.exit(1 if fails else 0)
