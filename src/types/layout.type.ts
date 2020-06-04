/** layout面包屑的route类型 */
export interface PageHeaderRoute {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}
