import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ type: 'text', unique: true })
    @Field()
    email: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

}