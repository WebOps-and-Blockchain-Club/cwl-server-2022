import { IsMobilePhone, isPhoneNumber } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Issue from './issue'
@Entity('Volunteer')
@ObjectType("Volunteer")
class Volunteer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id!: string;

    @Column()
    @Field(() => String)
    tags!: string;

    @Column()
    @Field(() => String)
    phoneNumber!: string;

    @Column()
    @Field()
    username!: string;

    @Column()
    password!: string;

    @OneToMany(() => Issue, issue => issue.tags)
    @Field(() => [Issue])
    issue!: Issue[];

}
export default Volunteer

