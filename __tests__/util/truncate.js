import databse from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(databse.connection.models).map(key => {
      return databse.connection.models[key].destroy({ truncate: true, force: true });
    })
  )
}
