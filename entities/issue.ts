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
    @Field()
    desc!: [string];

    @Column()
    @Field()
    PhoneNumber!: Number;

    @Column()
    @Field()
    tags!: string;

    @Column()
    @Field()
    location!: string;

    @ManyToOne(() => Volunteer, volunteer => volunteer.id, { nullable: false })
    @Field(() => Volunteer)
    volunteer!: Volunteer;
}
export default Issue