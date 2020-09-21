import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn} from "typeorm";
import {Order} from "./zz__yashi_order"

@Entity("zz__yashi_creative")
@Index('fk_zz__yashi_creative_order_id_idx',["order_id"])
export class Creative{
    @PrimaryGeneratedColumn()
    creative_id: number

    @Column({ default: null, unique: true })
    yashi_creative_id: number

    @Column({ length: 255, default: null })
    name: string
    
    @Column({ length: 255, default: null })
    preview_url: string

    @ManyToOne(type => Order, { onDelete: 'CASCADE' , onUpdate: 'NO ACTION'})
    @JoinColumn({ referencedColumnName: "order_id", name: "order_id" })
    order_id: Order
}