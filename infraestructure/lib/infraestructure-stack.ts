import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfraestructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'cdk-react-tutorial-bucket',
      websiteIndexDocument: 'index.html',
      blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false })
    });

    const bucketPolicy = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [
        `${bucket.bucketArn}/*`
      ],
      principals: [new iam.AnyPrincipal()],
    })
    
    bucket.addToResourcePolicy(bucketPolicy);

  }
}
