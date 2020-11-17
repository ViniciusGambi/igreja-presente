import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateWhatsappMessage1605038557586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'whatsapp_messages',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'reserve_group_id',
              type: 'uuid',
            },
            {
              name: 'sent',
              type: 'boolean',
              default: 'false',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'WhatsappMessageReserveGroup',
              columnNames: ['reserve_group_id'],
              referencedTableName: 'reserve_groups',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('whatsapp_messages');
    }

}
