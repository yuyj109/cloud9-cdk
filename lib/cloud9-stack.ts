import * as cdk from '@aws-cdk/core';

import * as iam from '@aws-cdk/aws-iam';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as cloud9 from '@aws-cdk/aws-cloud9';

export class Cloud9Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const defaultVpc = ec2.Vpc.fromLookup(this, 'vpc', { isDefault: true });

    const cloud9Ec2AdminRole = new iam.Role(this, 'Cloud9Ec2AdminRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          'Cloud9Ec2AdminPolicy',
          'arn:aws:iam::aws:policy/AdministratorAccess',
        ),
      ],
    });
    new iam.CfnInstanceProfile(this, 'Cloud9Ec2AdminRoleInstanceProfile', {
      roles: [cloud9Ec2AdminRole.roleName],
    });

    new cloud9.Ec2Environment(this, 'Cloud9Ec2Env', {
      vpc: defaultVpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.SMALL,
      ),
    });
  }
}
