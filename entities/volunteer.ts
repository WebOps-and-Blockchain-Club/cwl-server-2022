import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Issue from './issue'
@Entity('Volunteer')
@ObjectType("Volunteer")
class Volunteer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string | undefined;

    @Column()
    @Field()
    tags: string | undefined;

    @Column()
    @Field()
    PhoneNumber!: Number;

    @Column()
    @Field()
    username!: string;

    @Column()
    @Field()
    password!: string;

    @OneToMany(() => Issue, issue => issue.desc, { nullable: false })
    @Field(() => [Issue])
    issue!: Issue[];

}
export default Volunteer

