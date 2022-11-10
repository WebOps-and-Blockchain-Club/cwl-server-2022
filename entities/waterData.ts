import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("WaterData")
@ObjectType("WaterData")
class WaterData extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Field(() => String)
  image!: string;

  @Column()
  @Field(() => String)
  location!: string;

  @Column()
  @Field(() => Number)
  depth!: number;

  @Column()
  @Field(() => Date)
  date!: Date;

  @Column({ nullable: true })
  @Field(() => String, { defaultValue: "" })
  remarks!: string;
}

export default WaterData;
