import { isMobilePhone } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Volunteer from "./volunteer";

@Entity("Issue")
@ObjectType("Issue")
class Issue extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Field(() => String)
  desc!: string;

  @Column()
  @Field(() => String)
  phoneNumber!: string;

  @Column()
  @Field(() => String)
  tags!: string;

  @Column()
  @Field()
  location!: string;

  @ManyToOne(() => Volunteer, (volunteer) => volunteer.tags)
  @Field(() => Volunteer)
  volunteer!: Volunteer;
}
export default Issue;
