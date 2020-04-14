import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Timestamp, OneToMany } from "typeorm";

@Entity({
  name: 'todos'
})
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  due: Date;

  @Column({
    name: 'is_checked',
    default: false,
  })
  isChecked: boolean;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    nullable: true
  })
  deletedAt: Date;

  @ManyToOne(type => Todo, todo=> todo.children, {
    onDelete: 'CASCADE'
  })
  parent: Todo;

  @OneToMany(type => Todo, todo => todo.parent)
  children: Todo[];
}