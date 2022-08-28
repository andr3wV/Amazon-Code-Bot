const superagent = require('superagent').agent();
const config = require('./src/models/config');

//Enter valid email and password before running!
const ytm = async() => {
    //logins using email and password
    let dashboard = await superagent
    .post('https://www.amazon.co.uk/ap/signin')
    .send({email: [ENTER EMAIL], password: [ENTER PASSWORD], workflowState: 'eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.lbLY7zEcguVjyQQcdYSCniyr8dTJsJrOy9JTBVQ4KoednADGflDGlQ.3dmYF9JNkkM9rpfF.6sCLrZ4tgmFehPADHeJ1nskZRU0_mWZ6JlD0MFx_dvUmkTAbm3kre2y5MLeAh1hJQ6EODqmwGoCDCj-wPkP15wrRkR_p8_nCdc5_pQgxlJqTjLE398WeIkR5vFSJQ1oOVZKZclCr7a8XiXhA4UJoNe6iqnvLGwix3I6JaW6Z79n8lk7XlakNl8JtFibm-3u08-oJfLZsHljbYdPaBC8yIK-XHkWcS9_4wULsRJASh_y_w6RAEmXNIKy5PwY0peW7u4skCxceOgvNm0MAJcPn0JxXRfqfmlXPlWmm1_hcwseWDxJUt9QCAWi-SViFUBZD7XzFlw_QA4BkiwG1Jf46jBqf4VErPFOW2fwdbzLhK55jDmAz.8AmRKUkcvFD-NKMT0KfIEw'})
    .set('Content-Type', 'application/x-www-form-urlencoded')
    console.log(dashboard.text);

    //tries to redeem all codes stored in config.codeArr
    for(var i = 0; i<config.codeArr.length; i++){
        let redeem = await superagent.post('https://www.amazon.co.uk/portal-migration/gc/redeem/result')
        .send({claimCode: config.codeArr[i], csrf: 'gitiutM4V3EbT8fm7fdLsqK1kLiUn5hzI42HSW0AAAACAAAAAGLA/ORyYXcAAAAAdD8UfeR70VYolPtdUfyR'})
        console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
        console.log(`Trying Code #${i}...`);
    }
}

ytm();
