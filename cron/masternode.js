
require('babel-polyfill');
require('../lib/cron');
const config = require('../config');
const { exit, rpc } = require('../lib/cron');
const fetch = require('../lib/fetch');
const { forEach } = require('p-iteration');
const locker = require('../lib/locker');
const moment = require('moment');
// Models.
const Masternode = require('../model/masternode');

/**
 * Get a list of the mns and request IP information
 * from freegeopip.net.
 */
async function syncMasternode() {
  const date = moment().utc().startOf('minute').toDate();

  await Masternode.remove({});

  const mns = await rpc.call('masternode', ['list']);
  const inserts = [];
  await forEach(mns, async (mn) => {
    const masternode = new Masternode({
      active: 0,
      addr: mn.addr,
      createdAt: date,
      lastAt: new Date(mn.lastseen * 1000),
      lastPaidAt: new Date(mn.lastpaid * 1000),
      network: mn.ip.substr(0, 1) === '[' ? 'IPv6' : 'IPv4',
      rank: mn.rank,
      status: mn.status,
      txHash: mn.txhash,
      txOutIdx: mn.outidx,
      ver: mn.version
    });

    inserts.push(masternode);
  });

  if (inserts.length) {
    await Masternode.insertMany(inserts);
  }
}

/**
 * Handle locking.
 */
async function update() {
  const type = 'masternode';
  let code = 0;

  try {
    locker.lock(type);
    await syncMasternode();
  } catch(err) {
    console.log(err);
    code = 1;
  } finally {
    locker.unlock(type);
    exit(code);
  }
}

update();
