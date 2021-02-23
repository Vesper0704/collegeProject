<template >
  <el-table
		style="width:100%;font-family: 'Comic Sans MS';color:indianred;background-color:indianred"
		border
		:data="tableData"
	>
		<el-table-column
      prop="name"
      label=" ITEM "

      >
    </el-table-column>
		<el-table-column
      prop="value"
      label="VALUE"

      >
    </el-table-column>
	</el-table>
</template>
<script>
export default {
	props: {
		tableData: Array
	}
}
</script>

