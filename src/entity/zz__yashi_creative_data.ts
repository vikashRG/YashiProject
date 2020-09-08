import {Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, Index, JoinColumn} from "typeorm";
import {Creative} from "./zz__yashi_creative"

@Entity("zz__yashi_creative_data")
@Unique('creative_id_UNIQUE',['creative_id','log_date'])
@Index('fk_zz__yashi_creative_data_creative_id_idx',["creative_id"])
export class CreativeData{
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

    @ManyToOne(type => Creative, { onDelete: 'CASCADE' , onUpdate:'NO ACTION'})
    @JoinColumn({ referencedColumnName: "creative_id", name: "creative_id" })
    creative_id: Creative
}