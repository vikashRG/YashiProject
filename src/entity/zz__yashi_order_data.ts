import {Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, Index, JoinColumn} from "typeorm";
import {Order} from "./zz__yashi_order"

@Entity("zz__yashi_order_data")
@Unique('order_id',['order_id','log_date'])
@Index('fk_zz__yashi_order_data_order_id_idx',["order_id"])
export class OrderData{
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

    @ManyToOne(type => Order, { onDelete: 'CASCADE' , onUpdate:'NO ACTION'})
    @JoinColumn({ referencedColumnName: "order_id", name: "order_id" })
    order_id: Order
}