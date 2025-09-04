import { Card, Table } from 'mantis-ui';
import { tableData, tableColumns } from '../../../../data/tableData';

const TableDemo = () => {
  return (
    <Card>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        hoverable
        striped
        responsive
        onRowClick={(record: any) => console.log('Row clicked:', record)}
      />
    </Card>
  );
};

export default TableDemo;
