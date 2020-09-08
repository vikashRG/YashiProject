import {Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, Index, JoinColumn} from "typeorm";
import {Cgn} from "./zz__yashi_cgn"

@Entity("zz__yashi_cgn_data")
@Unique('campaign_id_UNIQUE',['campaign_id','log_date'])
@Index('fk_zz__yashi_cgn_data_campaign_id_idx',["campaign_id"])
export class CgnData{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    log_date: number

    @Column({ default: null })
    impression_count: number

    @Column({ default: null })
    click_count: number

    @Column({ default: null })
    "25viewed_count": number
    
    @Column({ default: null })
    "50viewed_count": number

    @Column({ default: null })
    "75viewed_count": number

    @Column({ default: null })
    "100viewed_count": number

    @ManyToOne(type => Cgn, { onDelete: 'CASCADE' , onUpdate:'NO ACTION'})
    @JoinColumn({ referencedColumnName: "campaign_id", name: "campaign_id" })
    campaign_id: Cgn
}