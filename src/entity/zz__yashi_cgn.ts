import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("zz__yashi_cgn")
export class Cgn{
    @PrimaryGeneratedColumn()
    campaign_id: number;

    @Column({  length: 255, default: null })
    name: string;

    @Column({ default: null, unique: true})
    yashi_campaign_id: number;
    
    @Column({  default: null })
    yashi_advertiser_id: number;

    @Column({ length: 100, default: null })
    advertiser_name: string

}