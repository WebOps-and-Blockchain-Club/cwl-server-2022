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
    @Field(() => Number)
    PhoneNumber!: Number;

    @Column()
    @Field()
    username!: string;

    @Column()
    @Field()
    password!: string;

    @OneToMany(() => Issue, issue => issue.desc)
    @Field(() => [Issue])
    issue!: Issue[];

}
export default Volunteer

