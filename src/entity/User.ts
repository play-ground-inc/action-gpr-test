import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    readonly id: string;

    @Column({ type: 'text', unique: true })
    @Field()
    email: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

}