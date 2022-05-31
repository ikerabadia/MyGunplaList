const fs = require('fs');
const moduleName = process.argv.slice(2)[0];
const microserviceLowerCase = process.argv.slice(2)[1];
const moduleNameLowerCase = moduleName.toLowerCase();
const moduleNameToCamelCase = camelize(moduleName);
const moduleNameToUpperSnakeCase = moduleNameToCamelCase.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
fs.mkdirSync(`./${moduleNameToCamelCase}`);

fs.mkdirSync(`./${moduleNameToCamelCase}/domain`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto/input`);
fs.mkdirSync(`./${moduleNameToCamelCase}/infrastructure/controller/dto/output`);



fs.writeFileSync(`./${moduleNameToCamelCase}/domain/${moduleName}.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain;

import com.bosonit.staffit.shared.Auditable;
import com.bosonit.staffit.shared.ObjectUtil;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ${moduleName} extends Auditable<String> {

  private String id${moduleName};

  private ${moduleName}Jpa ${moduleNameToCamelCase}Jpa;

  public ${moduleName}(${moduleName}Jpa ${moduleNameToCamelCase}Jpa) {
    if (${moduleNameToCamelCase}Jpa == null) return;
    this.${moduleNameToCamelCase}Jpa = ${moduleNameToCamelCase}Jpa;

    this.setCreatedBy(${moduleNameToCamelCase}Jpa.getCreatedBy());
    this.setCreatedDate(${moduleNameToCamelCase}Jpa.getCreatedDate());
    this.setLastModifiedBy(${moduleNameToCamelCase}Jpa.getLastModifiedBy());
    this.setLastModifiedDate(${moduleNameToCamelCase}Jpa.getLastModifiedDate());

    this.setId${moduleName}(${moduleNameToCamelCase}Jpa.getId${moduleName}());
  }

  public void update(${moduleName} ${moduleNameToCamelCase}) {
    ObjectUtil.copyProperties(
        ${moduleNameToCamelCase},
        this,
        new String[] {"id", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate"});
  }
}
`);


fs.writeFileSync(`./${moduleNameToCamelCase}/domain/${moduleName}Jpa.java`, `
package com.bosonit.staffit.${moduleNameLowerCase}.content.${moduleNameToCamelCase}.domain;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName}Jpa;
import com.bosonit.staffit.shared.Auditable;
import com.bosonit.staffit.shared.sequences.StringPrefixedSequenceIdGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MSTR_${moduleNameToUpperSnakeCase}")
public class ${moduleName}Jpa extends Auditable<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "${moduleNameToUpperSnakeCase}_SEQ")
  @GenericGenerator(
      name = "${moduleNameToUpperSnakeCase}_SEQ",
      strategy = "com.bosonit.staffit.shared.sequences.StringPrefixedSequenceIdGenerator",
      parameters = {
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM,
            value = "1"),
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER,
            value = "${moduleName.toUpperCase().substring(0, 3)}"),
        @org.hibernate.annotations.Parameter(
            name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER,
            value = "%08d")
      })
  @Column(name = "ID_${moduleNameToUpperSnakeCase}")
  private String id${moduleName};

  public ${moduleName}Jpa(${moduleName} ${moduleNameToCamelCase}) {
    if (${moduleNameToCamelCase} == null) return;

    this.setCreatedBy(${moduleNameToCamelCase}.getCreatedBy());
    this.setCreatedDate(${moduleNameToCamelCase}.getCreatedDate());
    this.setLastModifiedBy(${moduleNameToCamelCase}.getLastModifiedBy());
    this.setLastModifiedDate(${moduleNameToCamelCase}.getLastModifiedDate());

    this.setId${moduleName}(${moduleNameToCamelCase}.getId${moduleName}());
  }
}
`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Save${moduleName};
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class ${moduleName}InputDTO {


    public Save${moduleName} ${moduleNameToCamelCase}(Save${moduleName} save${moduleName}) {
        return save${moduleName};
    }
}

`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/Search${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input.GroupSearch${moduleName}InputDTO;
import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import lombok.*;


@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Search${moduleName}InputDTO {
    private String id${moduleName};

    public Search${moduleName} search${moduleName}(){
        Search${moduleName} search${moduleName} = new Search${moduleName}();

        search${moduleName}.setId${moduleName}(this.getId${moduleName}());

        return search${moduleName};
    }
}
`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/input/GroupSearch${moduleName}InputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.input;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.noDatabase.Search${moduleName};
import com.bosonit.staffit.shared.dto.GroupSearchInputDTO;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class GroupSearch${moduleName}InputDTO
    extends GroupSearchInputDTO<Search${moduleName}InputDTO> {}

`);

fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/output/${moduleName}OutputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ${moduleName}OutputDTO extends Simple${moduleName}OutputDTO
    implements Serializable {

  public ${moduleName}OutputDTO(${moduleName} ${moduleNameToCamelCase}) {
    super(${moduleNameToCamelCase});
  }
}

`);
fs.writeFileSync(`./${moduleNameLowerCase}/infrastructure/controller/dto/output/Simple${moduleName}OutputDTO.java`, `
package com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.infrastructure.controller.dto.output;

import com.bosonit.staffit.${microserviceLowerCase}.content.${moduleNameToCamelCase}.domain.${moduleName};
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class Simple${moduleName}OutputDTO implements Serializable {
  protected String id${moduleName};

  public Simple${moduleName}OutputDTO(${moduleName} ${moduleNameToCamelCase}) {
    this.setId${moduleName}(${moduleNameToCamelCase}.getId${moduleName}());
  }
}

`);
