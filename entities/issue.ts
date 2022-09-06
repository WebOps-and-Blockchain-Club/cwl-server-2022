import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Volunteer from "./volunteer";

@Entity("Issue")
@ObjectType("Issue")
class Issue extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id!: string;

    @Column()
    @Field(() => String)
    desc!: string;

    @Column()
    @Field()
    PhoneNumber!: Number;

    @Column()
    @Field(() => String)
    tags!: string;

    @Column()
    @Field()
    location!: string;

    @Column()
    @Field()
    status!: string;

    @ManyToOne(() => Volunteer, volunteer => volunteer.tags)
    @Field(() => Volunteer)
    volunteer!: Volunteer;
}
export default Issue