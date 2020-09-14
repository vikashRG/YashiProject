import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {Cgn} from "./entity/zz__yashi_cgn";
import {CgnData} from "./entity/zz__yashi_cgn_data";
import {Order} from "./entity/zz__yashi_order";
import {OrderData} from "./entity/zz__yashi_order_data";
import {Creative} from "./entity/zz__yashi_creative";
import {CreativeData} from "./entity/zz__yashi_creative_data";

const ftp = require("ftp");
const csv = require('csv-parser');
var fs = require('fs');

createConnection({
    type: "sqlite",
    database: "yashi.sqlite",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    var c = new ftp();
    const advertiser_ids = []

    c.get('Yashi_Advertisers.csv', async function(err, stream){
        if (err) throw err;

        await stream.once('close', async function() { c.end(); });
        await stream.pipe(csv()).on('data', async (row: any) => {
            advertiser_ids.push(row['Advertiser ID']);
        });
    });

    c.list('/', async function(err, files){
        if (err) throw err;

        for(let file of files){
            if(file.name != 'Yashi_Advertisers.csv'){
                c.get(file.name, async function(err, stream) {
                    if (err) throw err;
            
                    await stream.once('close', async function() { c.end(); });
                    await stream.pipe(csv()).on('data', async (row: any) => {
                        
                        if(advertiser_ids.indexOf(row['Advertiser ID']) > -1){

                            var check_date = new Date(row['Date'])
                            if((check_date.getMonth() + 1) == 5){
                                var date = + check_date
                                date = date/1000
                                
                                await connection
                                    .createQueryBuilder()
                                    .insert()
                                    .into(Cgn)
                                    .values([
                                        { yashi_advertiser_id: parseInt(row['Advertiser ID']), yashi_campaign_id: parseInt(row['Campaign ID']), advertiser_name: row['Advertiser Name'], name: row['Campaign Name']}
                                    ])
                                    .execute()
                                    .catch(error => {
                                        if(error.errno != 1062){
                                            // skip duplicate entry error
                                            console.log(error)
                                        }
                                    });
                    
                                    
                                    let campaign = await connection
                                        .createQueryBuilder()
                                        .select("cgn")
                                        .from(Cgn, "cgn")
                                        .where("cgn.yashi_campaign_id = :id", { id: parseInt(row['Campaign ID']) })
                                        .getOne();
                    
                                    await connection
                                        .createQueryBuilder()
                                        .insert()
                                        .into(CgnData)
                                        .values([
                                            { log_date: date, 
                                                impression_count: row['Impressions'], 
                                                click_count: row['Clicks'], 
                                                "25viewed_count": row['25% Viewed'],
                                                "50viewed_count": row['50% Viewed'],
                                                "75viewed_count": row['75% Viewed'],
                                                "100viewed_count": row['100% Viewed'],
                                                campaign_id: campaign
                                            }
                                        ])
                                        .execute()
                                        .catch(error => {
                                            if(error.errno != 1062){
                                                // skip duplicate entry error
                                                console.log(error)
                                            }
                                        });
                    
                                    await connection
                                        .createQueryBuilder()
                                        .insert()
                                        .into(Order)
                                        .values([
                                            { yashi_order_id: parseInt(row['Order ID']), name: row['Order Name'], campaign_id: campaign}
                                        ])
                                        .execute()
                                        .catch(error => {
                                            if(error.errno != 1062){
                                                // skip duplicate entry error
                                                console.log(error)
                                            }
                                        });
                                    
                                    let order = await connection
                                        .createQueryBuilder()
                                        .select("order")
                                        .from(Order, "order")
                                        .where("order.yashi_order_id = :id", { id: parseInt(row['Order ID']) })
                                        .getOne();
                    
                                    await connection
                                        .createQueryBuilder()
                                        .insert()
                                        .into(OrderData)
                                        .values([
                                            { log_date: date, 
                                                impression_count: row['Impressions'], 
                                                click_count: row['Clicks'], 
                                                "25viewed_count": row['25% Viewed'],
                                                "50viewed_count": row['50% Viewed'],
                                                "75viewed_count": row['75% Viewed'],
                                                "100viewed_count": row['100% Viewed'],
                                                order_id: order
                                            }
                                        ])
                                        .execute()
                                        .catch(error => {
                                            if(error.errno != 1062){
                                                // skip duplicate entry error
                                                console.log(error)
                                            }
                                        });
                
                                    await connection
                                        .createQueryBuilder()
                                        .insert()
                                        .into(Creative)
                                        .values([
                                            { yashi_creative_id: parseInt(row['Creative ID']), name: row['Creative Name'], preview_url: row['Creative Preview URL'], order_id: order}
                                        ])
                                        .execute()
                                        .catch(error => {
                                            if(error.errno != 1062){
                                                // skip duplicate entry error
                                                console.log(error)
                                            }
                                        });
                                    
                                    let creative = await connection
                                        .createQueryBuilder()
                                        .select("creative")
                                        .from(Creative, "creative")
                                        .where("creative.yashi_creative_id = :id", { id: parseInt(row['Creative ID']) })
                                        .getOne();
                    
                                    await connection
                                        .createQueryBuilder()
                                        .insert()
                                        .into(CreativeData)
                                        .values([
                                            { log_date: date, 
                                                impression_count: row['Impressions'], 
                                                click_count: row['Clicks'], 
                                                "25viewed_count": row['25% Viewed'],
                                                "50viewed_count": row['50% Viewed'],
                                                "75viewed_count": row['75% Viewed'],
                                                "100viewed_count": row['100% Viewed'],
                                                creative_id: creative
                                            }
                                        ])
                                        .execute()
                                        .catch(error => {
                                            if(error.errno != 1062){
                                                // skip duplicate entry error
                                                console.log(error)
                                            }
                                        });
                            }
            
                        }
            
                    }).on('end', () => {
                        console.log(file.name+' file successfully processed');
                    });
                });

            }
        }
    })
    
    // connect to localhost:21 as anonymous
    c.connect({
        host: "ftp.clickfuel.com",
        user: "ftp_integration_test",
        password: "6k0Sb#EXT6jw"
    });
}).catch(error => console.log(error));
