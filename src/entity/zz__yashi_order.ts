import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn} from "typeorm";
import {Cgn} from "./zz__yashi_cgn"

@Entity("zz__yashi_order")
@Index('fk_zz__yashi_order_campaign_id_idx',["campaign_id"])
export class Order{
    @PrimaryGeneratedColumn()
    order_id: number

    @Column({ precision: 20, default: null})
    yashi_order_id: number

    @Column({ length: 200, default: null })
    name: string

    @ManyToOne(type => Cgn, { onDelete: 'CASCADE' , onUpdate: 'NO ACTION'})
    @JoinColumn({ referencedColumnName: "campaign_id", name: "campaign_id" })
    campaign_id: Cgn
}